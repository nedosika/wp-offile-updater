import trimChar from "../helpers/trimChar.js";
import {API, ERRORS} from "../consts.js";
import axios from "axios";
import TaskService from "./TasksService.js";

export default class WordpressService {

    constructor({id, name, timeout, title, wordpress, siteMap}) {
        this.id = id;
        this.name = name;
        this.siteMap = siteMap;
        this.timeout = timeout;
        this.title = title;
        this.wordpress = wordpress;
        this.report = {
            posts: [],
            errors: []
        };
        this.status = {
            start: new Date()
        }

        this.updatePosts();

        return this;
    }

    static getSlug(url) {
        const partedUrl = trimChar(url, '/').split('/');
        const slug = partedUrl[partedUrl.length - 1];
        if (!slug)
            throw new Error(ERRORS.slug);
        return slug;
    }

    static getCategories(url) {
        const partedUrl = trimChar(url, '/').split('/');
        return partedUrl.length > 4 ? partedUrl.slice(3, -1) : [];
    }

    async fetchTitleFormPost({url}) {
        const {index, regExp} = this.title.parser;
        const results = await axios(url).then(({data}) => data.match(new RegExp(regExp)));
        const title = results[index];
        if (!title)
            throw new Error(ERRORS.title);
        return title;
    }

    async searchPostId({title}) {
        const response = await axios(encodeURI(`${this.wordpress.url}/${API.POSTS_API}?search=${title}`));
        console.log(`${this.wordpress.url}/${API.POSTS_API}?search=${title}`)
        const id = this.title.search.isStrong
            ? response.data.filter(({title}) => title === title.rendered)[0]?.id
            : response.data[0]?.id

        if (!id)
            throw new Error(ERRORS.post);

        return id
    }

    async addCategories({categories}) {
        if (!categories)
            return;

        const result = [];

        await categories.reduce(
            (p, category) => p.then(async (parent = 0) => {
                try {
                    const categoryCandidate = await this.searchCategory({category});
                    const resultCategory = categoryCandidate
                        ? categoryCandidate
                        : await this.addCategory({category, parent});
                    result.push(resultCategory.id);
                    return resultCategory.id;
                } catch (error) {
                    console.log(error.message);
                }
            }),
            Promise.resolve()
        );

        return {categories: result.slice(-1)}
    }

    async searchCategory({category}) {
        return axios(`${this.wordpress.url}/${API.CATEGORIES_API}?search=${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.data[0])
    }

    async addCategory({category, parent}) {
        return axios(`${this.wordpress.url}/${API.CATEGORIES_API}`, {
            method: 'POST',
            data: JSON.stringify({name: category, parent}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.auth
            }
        }).then(res => res.data)
    }

    async updatePost({id, data}) {
        return axios(`${this.wordpress.url}/${API.POSTS_API}/${id}`, {
            method: 'PUT',
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.wordpress.auth
            }
        }).then(({data}) => data);
    }

    updatePosts() {
        this.siteMap.urls.reduce((p, url, index, arr) => p.then(async (prev) => {
            this.status.progress = Math.ceil((index + 1) * 100 / this.siteMap.urls.length);

            try {
                console.log(url)
                //await delay(5000)
                const slug = WordpressService.getSlug(url);
                console.log(slug);
                const categories = WordpressService.getCategories(url);
                console.log(categories);
                const title = await this.fetchTitleFormPost({url});
                console.log(title);
                const id = await this.searchPostId({title});
                console.log(id);
                const data = JSON.stringify(Object.assign(
                    {slug: slug.replace('.html', '')},
                    await this.addCategories({categories})
                ))
                console.log(data);

                const post = await this.updatePost({id, data});

                this.report.posts.push({
                    url,
                    slug,
                    categories,
                    title,
                    id
                });

            } catch (error) {
                this.report.errors.push({url, error: error.message});
            }

            await TaskService.update(this);

        }), Promise.resolve()).finally(async () => {
            this.status.finish = new Date();
            await TaskService.update(this);
        });
    }
}