import SearchIcon from '@mui/icons-material/Search';
import "./Search.css"

export const Search = () => {
    return (
        <search>
            <form>
                <label>
                    <SearchIcon className='icon-search' />

                    <input className='input-search' type="search" name="search" />
                </label>
                <input className='input-btn' type="submit" value="Buscar" />
            </form>
        </search>
    )
}
