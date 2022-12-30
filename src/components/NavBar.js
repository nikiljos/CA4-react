import './NavBar.css'

const NavBar=(props)=>{

    let [isDark,changeTheme]=props.theme

    let toggleTheme=()=>{
        changeTheme(prev=>!prev)
    }

    return (
        <nav>
            <div className="title">Kalvium</div>
            <div className="mode-btn btn" onClick={toggleTheme}>{isDark?"Light":"Dark"} Mode</div>
        </nav>
    )
}

export default NavBar