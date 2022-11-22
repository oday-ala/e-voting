export function Loader({light}) {
    return (
        <div className={`loader ${light ? "loader-blue" : ""}`}>
            <h2>Loading</h2>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}