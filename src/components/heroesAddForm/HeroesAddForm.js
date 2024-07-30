import { useState } from "react";
import { useDispatch } from "react-redux";

import { v4 } from "uuid";

import { selectAll } from "../heroesFilters/HeroesFiltersSlice";
import { heroAdded } from "../heroesList/heroesSlice";
import { useHttp } from "../../hooks/http.hook";
import store from '../../store';


const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('')
    const [text, setText] = useState('')
    const [element, setElement] = useState('')
    const { request } = useHttp()
    const filters = selectAll(store.getState())
    const dispatch = useDispatch()

    const onAddHero = (e) => {
        e.preventDefault()
        const hero = {
            id: v4(),
            name: heroName,
            description: text,
            element: element,
        }

        request("http://localhost:3001/heroes", 'POST', JSON.stringify(hero))
            .then(hero => dispatch(heroAdded(hero)))
    }

    const renderFiltersOptions = (filters) => {
        // eslint-disable-next-line 
        return filters.map((filter, i) => {
            if (filter.translatedName !== 'All') {
                return <option key={i} value={filter.name}>{filter.translatedName}</option>
            }
        })
    }

    const elements = renderFiltersOptions(filters)
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onAddHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Name of the new hero</label>
                <input
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="What is my name?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="What can I do?"
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Select Hero Element</label>
                <select
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                    required
                    className="form-select"
                    id="element"
                    name="element">
                    <option value="">I own the element...</option>
                    {elements}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;