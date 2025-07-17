"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import api from "@/services/api"
import Cookies from "js-cookie"

const formSchema = z.object({
  password: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres.",
  }),
  email: z.string().min(1, { message: "Preencha o e-mail." }).email({ message: "Informe um e-mail válido." }),
})

type LoginFormData = z.infer<typeof formSchema>

export default function Login() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const formLogin = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async (data: LoginFormData) => {
        setLoading(true);
        setErrorVisible(false);
        try {
            const response = await api.post("/auth/login", data, { withCredentials: true });
            console.log(response.data);
            
            Cookies.set("access_token", response.data.access_token, { expires: 7 });
            router.replace("/");
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;

                if (status === 401) {
                    setErrorVisible(true);
                    setErrorMessage(data.detail || "Credenciais inválidas.");
                } else if (status === 429) {
                    setErrorVisible(true);
                    setErrorMessage(data.detail || "Muitas tentativas. Tente novamente mais tarde.");
                } else {
                    setErrorVisible(true);
                    setErrorMessage(data.detail || "Erro no servidor. Tente novamente mais tarde.");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if(token) {
            router.replace("/");
        }
    }, []);

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card className="flex flex-col gap-6">
                    <CardHeader>
                        <CardTitle>Faça login na sua conta</CardTitle>
                        <CardDescription>
                            Insira seu e-mail abaixo para fazer login na sua conta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...formLogin}>
                            <form onSubmit={formLogin.handleSubmit(handleLogin)} className="flex flex-col gap-6">
                                <FormField
                                    control={formLogin.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                            placeholder="example@waynesec.com"
                                            type="email"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formLogin.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="******" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {errorVisible && (
                                    <div className="text-sm text-red-500">
                                        {errorMessage}
                                    </div>
                                )}
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Entrando...": "Entrar"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}