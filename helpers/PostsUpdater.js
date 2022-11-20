import axios from "axios";

import {ERRORS} from "../consts.js";
import {getSlug} from "./getSlug.js";
import {getCategories} from "./getCategories.js";
import TaskService from "../services/TasksService.js";
import WordpressService from "../services/WordpressService.js";

export default class PostsUpdater {
    constructor({ id, name, timeout, title, wordpress, sitemap, status}) {
        this.id = id;
        this.name = name;
        this.sitemap = sitemap;
        this.timeout = timeout;
        this.title = title;
        this.wordpress = wordpress;
        this.report = {
            posts: [],
            errors: []
        };
        this.status = status;

        return this;
    }

    run() {
        this.sitemap.urls.reduce((p, url, index, arr) => p.then(async (prev) => {
            this.status.progress = Math.ceil((index + 1) * 100 / this.sitemap.length);

            const wordpressService = new WordpressService({url, auth: this.wordpress.auth});
            //console.log(authorization);
            //console.log(url)
            //await delay(5000)
            const slug = wordpressService.getSlug();
            console.log(slug);
            const categories = wordpressService.getCategories();
            console.log(categories);
            const title = await wordpressService.fetchTitleFormPost({parser: this.title.parser});
            console.log(title);
            const id = await wordpressService.searchPostId({title, isStrong: this.title.search.isStrong});
            console.log(id);
            // const data = JSON.stringify(Object.assign(
            //     {slug: slug.replace('.html', '')},
            //     await wordpressService.addCategories({categories})
            // ))
            // console.log(data);

            // return wordpressService.updatePost({id, data})
            //     .then((post) => {
            //         this.report.posts.push(post);
            //         return post;
            //     })
            //     .catch((error) => {
            //         console.log(error.message);
            //         this.report.errors.push({url, error: error.message});
            //         return {error: error.message}
            //     })
        }), Promise.resolve()).finally(async () => {
            this.status.finish = new Date();
            await TaskService.update(this);
        });
    }
}