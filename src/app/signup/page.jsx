"use client";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoTraduzza from "../../../public/assets/traduzza-logo.svg";
import "./signup.scss";
import { auth } from "../services/firebaseConfig";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!name) {
            setErrorMessage("Por favor, preencha o campo com seu nome.");
            return;
        }

        if (!isValidEmail(email)) {
            setErrorMessage("Por favor, insira um email válido.");
            return;
        }

        if (!password || !passwordConfirm) {
            setErrorMessage("Por favor, preencha o(s) campo(s) com uma senha.");
            return;
        }

        if (password !== passwordConfirm) {
            setErrorMessage("As senhas não correspondem.");
            return;
        }

        await createUserWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Esse e-mail já está em uso. Tente outro.");
            } else {
                setErrorMessage("Erro ao criar conta: " + error.message);
            }
        }
    }, [error]);

    useEffect(() => {
        if (user) {
            sessionStorage.setItem("signupSuccessMessage", "Cadastro realizado com sucesso. Faça seu login.");
            router.push("/login");
        }
    }, [user, router]);

    return (
        <div className="sign-container">
            <div className="logo-container">
                <Image src={logoTraduzza} width={150} alt="Logo Traduzza" />
            </div>
            <form onSubmit={handleSignUp} className="sign-form">
                <div className="box-name">
                    <label htmlFor="name">Seu nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="box-email">
                    <label htmlFor="email">Seu email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="box-password">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="box-passwordConfirm">
                    <label htmlFor="passwordConfirm">Confirme a sua senha</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">
                    {loading ? "Carregando..." : "CADASTRAR"}
                </button>
            </form>
            <div className="login-link">
                <p>Já possui conta? Acesse!</p>
                <Link href="/login">ENTRAR NA MINHA CONTA</Link>
            </div>
        </div>
    );
}
