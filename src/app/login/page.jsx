"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import Image from "next/image";
import logoTraduzza from "../../../public/assets/traduzza-logo.svg";
import logoGoogle from "../../../public/assets/logo-google.svg";
import "./login.scss";
import { auth } from "../services/firebaseConfig";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signInWithEmailAndPassword, user, error] = useSignInWithEmailAndPassword(auth);

    const router = useRouter();
    
    useEffect(() => {
        const message = sessionStorage.getItem("signupSuccessMessage");
        if (message) {
            Swal.fire({
                icon: "success",
                title: "Cadastro realizado com sucesso!",
                text: "Faça seu login para continuar.",
                confirmButtonText: "OK",
            });
            sessionStorage.removeItem("signupSuccessMessage");
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    return (
        <div className="login-container">
            <div className="logo-container">
                <Image src={logoTraduzza} width={150} alt="Logo Traduzza" />
            </div>
            <form onSubmit={handleLogin} className="login-form">
                <div className="box-email">
                    <label htmlFor="email">Seu email ou usuário</label>
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
                <button type="submit">ENTRAR</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <div className="signup-link">
                <p>Não possui conta? Cadastre-se!</p>
                <Link href="/signup">CRIAR UMA CONTA</Link>
            </div>
            <div className="google-login">
                <p>ou</p>
                <div>
                    Entre com 
                        <Image
                            src={logoGoogle}
                            width={20}
                            alt="Logo Google"
                        />
                </div>
            </div>
        </div>
    );
}
