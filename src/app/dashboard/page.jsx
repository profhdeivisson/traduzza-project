/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import Image from "next/image";
import Link from "next/link";

import "./dashboard.scss";
import logoTraduzza from "../../../public/assets/traduzza-logo.svg";
import iconUser from "../../../public/assets/icon-user.svg";
import iconSend from "../../../public/assets/icon-send.svg";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const router = useRouter();
    const containerRef = useRef(null);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    const showMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push("/login");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            {user ? (
                <div className="container">
                    <aside>
                        <div className="logo">
                            <Image src={logoTraduzza} width={150} alt="Logo Traduzza" />
                        </div>
                        <div className="container-historico">
                            <h2>HISTÓRICO</h2>
                            <div className="box-list-historico">
                                <ul>
                                    <li>FÁCIL - 25/10/2024</li>
                                    <li>MÉDIO - 25/10/2024</li>
                                    <li>FÁCIL - 25/10/2024</li>
                                    <li>DIFÍCIL - 25/10/2024</li>
                                </ul>
                            </div>
                        </div>
                        <div className="container-button">
                            <button>INICIAR NOVA TRADUÇÃO</button>
                        </div>
                    </aside>
                    <main>
                        <div className="container-menu">
                            <div className="btn-profile" onClick={showMenu}>
                                <span>Hello, USUARIO</span>
                                <Image src={iconUser} width={20} alt="Ícone Usuário" />
                                
                                <div className={`menu-dropdown ${isMenuVisible ? "show" : ""}`}
                                    ref={menuRef}>
                                    <Link href="/login">
                                        SAIR
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="container-conversa" ref={containerRef}>
                            <div className="box-gpt">
                                Vamos começar com um texto bem simples:<br />
                                <strong>Inglês:</strong><br />
                                "My name is John. I am ten years old. I have a brother and a sister. I like to play soccer and read books. My favorite color is blue."
                                Traduza para o português brasileiro, e depois te darei feedback.
                            </div>
                            <div className="box-user">
                                Meu nome é John. Eu tenho dez anos. Eu tenho um irmão é uma irmã. Eu gosto de jogar futebol e ler livros. Minha cor favorita é azul.
                            </div>
                            <div className="box-gpt">
                                Sua tradução ficou ótima, com apenas um pequeno erro de digitação. Aqui está a correção:<br />
                                <strong>Correção:</strong><br />
                                Em "Eu tenho um irmão é uma irmã", o correto é "Eu tenho um irmão e uma irmã".
                                Agora, vamos aumentar um pouco a dificuldade:<br />
                                <strong>Inglês:</strong><br />
                                "Every morning, I wake up at 7 o'clock. I brush my teeth, have breakfast, and go to school. My school is near my house, so I walk there. I like my teachers, and I enjoy learning new things."
                                Traduza para o português brasileiro quando estiver pronto!
                            </div>
                            <div className="box-user">
                                Meu nome é John. Eu tenho dez anos. Eu tenho um irmão é uma irmã. Eu gosto de jogar futebol e ler livros. Minha cor favorita é azul.
                            </div>
                            <div className="box-gpt">
                                Vamos começar com um texto bem simples:<br />
                                <strong>Inglês:</strong><br />
                                "My name is John. I am ten years old. I have a brother and a sister. I like to play soccer and read books. My favorite color is blue."
                                Traduza para o português brasileiro, e depois te darei feedback.
                            </div>
                            <div className="box-user">
                                Meu nome é John. Eu tenho dez anos. Eu tenho um irmão é uma irmã. Eu gosto de jogar futebol e ler livros. Minha cor favorita é azul.
                            </div>
                            <div className="box-gpt">
                                Sua tradução ficou ótima, com apenas um pequeno erro de digitação. Aqui está a correção:<br />
                                <strong>Correção:</strong><br />
                                Em "Eu tenho um irmão é uma irmã", o correto é "Eu tenho um irmão e uma irmã".
                                Agora, vamos aumentar um pouco a dificuldade:<br />
                                <strong>Inglês:</strong><br />
                                "Every morning, I wake up at 7 o'clock. I brush my teeth, have breakfast, and go to school. My school is near my house, so I walk there. I like my teachers, and I enjoy learning new things."
                                Traduza para o português brasileiro quando estiver pronto!
                            </div>
                            <div className="box-user">
                                Meu nome é John. Eu tenho dez anos. Eu tenho um irmão é uma irmã. Eu gosto de jogar futebol e ler livros. Minha cor favorita é azul.
                            </div>
                            <div className="box-gpt">
                                Vamos começar com um texto bem simples:<br />
                                <strong>Inglês:</strong><br />
                                "My name is John. I am ten years old. I have a brother and a sister. I like to play soccer and read books. My favorite color is blue."
                                Traduza para o português brasileiro, e depois te darei feedback.
                            </div>
                            <div className="box-user">
                                Meu nome é John. Eu tenho dez anos. Eu tenho um irmão é uma irmã. Eu gosto de jogar futebol e ler livros. Minha cor favorita é azul.
                            </div>
                            <div className="box-gpt">
                                Sua tradução ficou ótima, com apenas um pequeno erro de digitação. Aqui está a correção:<br />
                                <strong>Correção:</strong><br />
                                Em "Eu tenho um irmão é uma irmã", o correto é "Eu tenho um irmão e uma irmã".
                                Agora, vamos aumentar um pouco a dificuldade:<br />
                                <strong>Inglês:</strong><br />
                                "Every morning, I wake up at 7 o'clock. I brush my teeth, have breakfast, and go to school. My school is near my house, so I walk there. I like my teachers, and I enjoy learning new things."
                                Traduza para o português brasileiro quando estiver pronto!
                            </div>
                            <div className="box-user">
                                Meu nome é John. Eu tenho dez anos. Eu tenho um irmão é uma irmã. Eu gosto de jogar futebol e ler livros. Minha cor favorita é azul.
                            </div>
                            <div className="box-gpt">
                                Vamos começar com um texto bem simples:<br />
                                <strong>Inglês:</strong><br />
                                "My name is John. I am ten years old. I have a brother and a sister. I like to play soccer and read books. My favorite color is blue."
                                Traduza para o português brasileiro, e depois te darei feedback.
                            </div>
                            <div className="box-user">
                                Meu nome é John. Eu tenho dez anos. Eu tenho um irmão é uma irmã. Eu gosto de jogar futebol e ler livros. Minha cor favorita é azul.
                            </div>
                            <div className="box-gpt">
                                Sua tradução ficou ótima, com apenas um pequeno erro de digitação. Aqui está a correção:<br />
                                <strong>Correção:</strong><br />
                                Em "Eu tenho um irmão é uma irmã", o correto é "Eu tenho um irmão e uma irmã".
                                Agora, vamos aumentar um pouco a dificuldade:<br />
                                <strong>Inglês:</strong><br />
                                "Every morning, I wake up at 7 o'clock. I brush my teeth, have breakfast, and go to school. My school is near my house, so I walk there. I like my teachers, and I enjoy learning new things."
                                Traduza para o português brasileiro quando estiver pronto!
                            </div>
                            <div className="box-user">
                                Meu nome é John. Eu tenho dez anos. Eu tenho um irmão é uma irmã. Eu gosto de jogar futebol e ler livros. Minha cor favorita é azul.
                            </div>
                            <div className="box-gpt">
                                Vamos começar com um texto bem simples:<br />
                                <strong>Inglês:</strong><br />
                                "My name is John. I am ten years old. I have a brother and a sister. I like to play soccer and read books. My favorite color is blue."
                                Traduza para o português brasileiro, e depois te darei feedback.
                            </div>
                            <div className="box-user">
                                Meu nome é John. Eu tenho dez anos. Eu tenho um irmão é uma irmã. Eu gosto de jogar futebol e ler livros. Minha cor favorita é azul.
                            </div>
                            <div className="box-gpt">
                                Sua tradução ficou ótima, com apenas um pequeno erro de digitação. Aqui está a correção:<br />
                                <strong>Correção:</strong><br />
                                Em "Eu tenho um irmão é uma irmã", o correto é "Eu tenho um irmão e uma irmã".
                                Agora, vamos aumentar um pouco a dificuldade:<br />
                                <strong>Inglês:</strong><br />
                                "Every morning, I wake up at 7 o'clock. I brush my teeth, have breakfast, and go to school. My school is near my house, so I walk there. I like my teachers, and I enjoy learning new things."
                                Traduza para o português brasileiro quando estiver pronto!
                            </div>
                            <div className="box-user">
                                Meu nome é John. Eu tenho dez anos. Eu tenho um irmão é uma irmã. Eu gosto de jogar futebol e ler livros. Minha cor favorita é azul.
                            </div>
                        </div>
                        <div className="container-form-send">
                            <input type="text" name="text-user" id="text-user" />
                            <button>
                                <Image src={iconSend} alt="Ícone enviar" width={20} />
                            </button>
                        </div>
                    </main>
                </div>
            ) : null}
        </div>
    );
}
