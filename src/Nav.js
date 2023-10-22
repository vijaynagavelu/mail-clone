export default function Pagination({ pageNumber, setPageNumber, totalPages }) {

    const tp = totalPages;

    function addCounter() {
        if (pageNumber < totalPages) {
            setPageNumber(pageNumber + 1);
        }
    }

    function delCounter() {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    if (!totalPages) {
        return;
    }

    if (pageNumber > 0 && pageNumber < tp - 4 && totalPages) {
        return (
            <>
                <div>
                    <ul className="row paginationBar">
                        <li onClick={delCounter}
                        >{'<'}
                        </li>
                        <li className={(pageNumber === 1 ? "hide" : 'display')} onClick={() => setPageNumber(pageNumber - 1)}
                        >{pageNumber - 1}</li>
                        <li className="highlight" >{pageNumber}</li>
                        <li onClick={() => setPageNumber(pageNumber + 1)}
                        >{pageNumber + 1}</li>
                        <li onClick={() => setPageNumber(pageNumber + 2)}
                        >{pageNumber + 2}</li>
                        <li onClick={() => setPageNumber(pageNumber + 3)}
                        >{pageNumber + 3}</li>
                        <li className={(pageNumber < 1 ? "hide" : 'display')} onClick={() => setPageNumber(pageNumber + 4)}
                        >{pageNumber + 4}</li>
                        <li>. . . .</li>
                        <li onClick={() => setPageNumber(totalPages)}
                        >{totalPages}</li>
                        <li onClick={addCounter}>{'>'}</li>
                    </ul>
                </div>
            </>
        )
    }

    if (pageNumber >= tp - 4 && totalPages) {
        return (
            <>
                <div>
                    <ul className="row paginationBar">
                        <li onClick={delCounter}
                        >{'<'}
                        </li>
                        <li onClick={() => setPageNumber(1)}>{1}</li>
                        <li>. . . .</li>
                        <li className={(pageNumber === tp - 4 ? "highlight" : 'display')} onClick={() => setPageNumber(tp - 4)}>
                            {tp - 4}</li>
                        <li className={(pageNumber === tp - 3 ? "highlight" : 'display')} onClick={() => setPageNumber(tp - 3)}>
                            {tp - 3}</li>
                        <li className={(pageNumber === tp - 2 ? "highlight" : 'display')} onClick={() => setPageNumber(tp - 2)}>
                            {tp - 2}</li>
                        <li className={(pageNumber === tp - 1 ? "highlight" : 'display')} onClick={() => setPageNumber(tp - 1)}>
                            {tp - 1}</li>
                        <li className={(pageNumber === totalPages ? "highlight" : 'display')} onClick={() => setPageNumber(totalPages)}>{totalPages}</li>
                        <li onClick={addCounter}>{'>'}</li>
                    </ul>
                </div>
            </>
        )
    }
}






