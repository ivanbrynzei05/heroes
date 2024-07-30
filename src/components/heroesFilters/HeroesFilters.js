import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterChanged, fetchFilters } from "../heroesFilters/HeroesFiltersSlice";
import Spinner from "../spinner/Spinner";
import classNames from "classnames";
import { selectAll } from "../heroesFilters/HeroesFiltersSlice";
import store from "../../store";


const HeroesFilters = () => {
    const dispatch = useDispatch()
    const { filtersLoadingStatus, currentFilter } = useSelector(state => state.filters)
    const filters = selectAll(store.getState())



    useEffect(() => {
        dispatch(fetchFilters())
        // eslint-disable-next-line 
    }, [])

    const renderFilters = (elements) => {
        if (elements.length === 0) {
            return <h5 className="text-center mt-5">Фильтров пока нет</h5>
        } else {
            return elements.map((elem, i) =>
                <button
                    key={i}
                    className={classNames(`btn ${elem.colorClassName}`, { 'active': currentFilter === elem.name })}
                    onClick={() => dispatch(filterChanged(elem.name))}>
                    {elem.translatedName}
                </button>
            )
        }
    }

    const elements = renderFilters(filters)


    if (filtersLoadingStatus === 'loadind') {
        return <Spinner />
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by elements</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;