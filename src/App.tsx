import { useState } from 'react';
import croixRougeLogo from '/croix-rouge.ico';
import esgiLogo from '/esgi.jpeg';
import './App.css';

function App() {
	const [count, setCount] = useState(0);
	const toto = 'toto';
	console.log(toto);
	return (
		<div className="App">
			<div>
				<a href="https://www.esgi.fr/" target="_blank" rel="noreferrer">
					<img src={esgiLogo} className="logo" alt="Esgi logo" />
				</a>
				<a href="https://www.croix-rouge.fr/" target="_blank" rel="noreferrer">
					<img src={croixRougeLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Esgi + Croix Rouge</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					La note est {count} / 20
				</button>
				<p>
					Projet annuel 5AL1 
				</p>
			</div>
			<p className="read-the-docs">
				Cliquer sur les logo ESGI ou Croix Rouge pour plus d'informations.
			</p>
		</div>
	);
}

export default App;
