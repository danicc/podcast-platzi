export default class Home extends React.Component {
    render(){
        return (
            <div>
                <h1>React Applications Made Simple</h1>
                <h3><b>Next.js</b> is a lightweight framework for static and server‑rendered applications.</h3>
                <img src="./static/next-js.png" alt="Next.js"/>
                <style jsx>{`
                    h1 {
                        color: #0791E6;
                        text-align: center;
                    }
                    h3 {
                        color: #45c600;
                        text-align: center;
                    }
                    div {
                        border: 2px #ffff56 solid;
                        margin: 5px;
                        background: red;
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: #142229;
                    }
                `}</style>
                <style global jsx>{`
                    body {
                        margin: 5px;
                        padding: 5px;
                        border: 2px #ffff56 solid;
                        background: #000491;
                    }
                `}</style>
            </div>
        );
    }
}