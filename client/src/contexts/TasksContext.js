import {createContext, useContext, useState} from "react";

export const TASK_FIELDS = {
    wordpressApiUrl: 'wordpressApiUrl',
    username: 'login',
    password: 'password',
    errorsLogs: 'errorsLogs',
    infoLogs: 'infoLogs',
    consoleLogs: 'consoleLogs',
    tagTitle: 'tagTitle',
    arraysIndex: 'arraysIndex',
    isAddCategories: 'isAddCategories',
    isLoading: 'isLoading',
    progress: 'progress',
    timeout: 'timeout',
    logs: 'logs',
    urls: 'urls',
    isStrongSearch: 'isStrongSearch',
    onlyHtml: 'onlyHtml',
    orderBy: 'orderBy',
    order: 'order',
    posts: 'posts'
}

export const orderByList = {
    title: 'title',
    date: 'date'
}

export const order = {
    asc: 'asc',
    desc: 'desc'
}


const initialState = {
    // [STATE_FIELDS.wordpressUrl]: 'https://wottakk.ru',
    // [STATE_FIELDS.username]: 'admin55',
    // [STATE_FIELDS.password]: 'sjuF 2lfG rsow 2exs FzWU blhg',
    // sjuF 2lfG rsow 2exs FzWU blhg
    // 9ixn TEy0 fkQF dHvb 3uqp CpyD
    // V8Gh Bu6E COTa 6K81 EOFV w69p - jancel.ru
    task: {
        [TASK_FIELDS.wordpressApiUrl]: '',
        [TASK_FIELDS.username]: '',
        [TASK_FIELDS.password]: '',
        [TASK_FIELDS.tagTitle]: '(?<=>)(.*)(?=<)',
        [TASK_FIELDS.arraysIndex]: 0,
        [TASK_FIELDS.isAddCategories]: true,
        [TASK_FIELDS.progress]: 0,
        [TASK_FIELDS.timeout]: 0,
        [TASK_FIELDS.logs]: [],
        [TASK_FIELDS.urls]: [],
        [TASK_FIELDS.isStrongSearch]: false,
        [TASK_FIELDS.isLoading]: false,
        [TASK_FIELDS.onlyHtml]: true,
        [TASK_FIELDS.order]: order.asc,
        [TASK_FIELDS.orderBy]: orderByList.title,
        [TASK_FIELDS.posts]: []
    }
}

const TasksContext = createContext({});

export const useTasksContext = () => useContext(TasksContext);

const TasksProvider = ({children}) => {
    const [task, setTask] = useState(initialState.task);

    return <TasksContext.Provider value={{
        task,
        setTask: (field) => setTask((prevState) => ({...prevState, ...field}))
    }}>
        {children}
    </TasksContext.Provider>
}

export default TasksProvider;