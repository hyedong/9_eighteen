import { userConstants } from '../constants'
import { categoryService } from '../services/category.services'
import {history} from '../history'
export const categoryActions = {
    categoryGet,
    categoryEdit,
    categoryUpdate,
    categoryDelete,
    categoryAdd
}

function categoryGet(id) {
    return dispatch => {
        dispatch(request(id))
        console.log('get')
        categoryService.categoryGet(id)
            .then(
                (categories) => {
                    console.log(categories)
                dispatch(success(categories)) 
                history.push('/home')
            },
                error => {
                    console.log(error)
                }
            )
    }
    function request(id) {
        return {
            type: userConstants.CATEGORY_GET_REQUEST,
            id
        }
    }
    function success(categories) {
        return {
            type: userConstants.CATEGORY_GET_SUCCESS,
            categories
        }
    }
}
function categoryEdit(id) {
    return dispatch => {
        dispatch(request(id))
        console.log("edit")
        categoryService.categoryEdit(id)
            .then(
                (category) => {
                    dispatch(success(category))
                    history.push('/home')
                },
                error => {
                    console.log(error)
                }
            )
    }
    function request(id) {
        return {
            type: userConstants.CATEGORY_EDIT_REQUEST,
            id
        }
    }
    function success(category) {
        return {
            type: userConstants.CATEGORY_EDIT_SUCCESS,
            category
        }
    }
}

function categoryUpdate(category) {
    return dispatch => {
        console.log("update")
        dispatch(request(category.categoryId))
        categoryService.categoryUpdate(category)
            .then(
                () => {
                    dispatch(success())
                    history.push('/home')
                },
                error => {
                    console.log(error)
                }
            )
    }
    function request(id) {
        return {
            type: userConstants.CATEGORY_UPDATE_REQUEST,
            id
        }
    }
    function success() {
        return {
            type: userConstants.CATEGORY_UPDATE_SUCCESS
        }
    }
}

function categoryDelete(id) {
    return dispatch => {
        dispatch(request(id))
        console.log("delete")
        categoryService.categoryDelete(id)
            .then(
                () => {
                    dispatch(success())
                    history.push('/home');
                },
                error => {
                    console.log(error)
                }
            )
    }
    function request(id) {
        return {
            type: userConstants.CATEGORY_DELETE_REQUEST,
            id
        }
    }
    function success() {
        return {
            type: userConstants.CATEGORY_DELETE_SUCCESS
        }
    }
}

function categoryAdd(category) {
    return dispatch => {
        dispatch(request(category))
        console.log("add")
        categoryService.categoryAdd(category)
            .then(
                (categories, category) => {
                    dispatch(success(categories, category))
                    history.push('/home')
                },
                error => {
                    console.log(error)
                }
            )
    }
    function request(category) {
        return {
            type: userConstants.CATEGORY_ADD_REQUEST,
            category
        }
    }
    function success(categories, category) {
        return {
            type: userConstants.CATEGORY_ADD_SUCCESS,
            categories, 
            category
        }
    }
}
