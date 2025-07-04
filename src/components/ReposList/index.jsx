import { useEffect, useState } from "react";

import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState([false]);
    const [deuErro, setDeuErro] = useState(false);

    useEffect(() => {
        setEstaCarregando(true);
        setDeuErro(false);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => { 
            if (!res.ok) {
                throw new Error("Erro na resposta do API");
            }
            return res.json(); 
        })
        .then(resJson => {
            setTimeout(() => {
                setEstaCarregando(false);
                setRepos(resJson);
            },1000);
        }).catch (e => {
            setDeuErro(true);
            setEstaCarregando(false);
            alert("Erro na busca do API")
        })
    }, [nomeUsuario]);

    return (
        <div className="container">
            {estaCarregando ? (
            <h1>Carregando...</h1>
        ): (
            
            <ul className={styles.list}>
            {/* {repos.map(repositorio => ( */}
                {repos.map(({ id, name, language, html_url }) => (
                    <li className={styles.listItem} key={id}>
                    <div className={styles.listName}>
                        <b>Nome:</b>
                        {name}
                    </div>
                    <div className={styles.listLanguage}>
                        <b> Linguagem:</b>
                        {language}
                    </div>
                    <a className={styles.listLink} target="_blank" href={html_url}> Visitar no github</a>
                </li>
            ))}
        </ul>
        )}
        </div>
    )
}

export default ReposList;