import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the UserContext type
interface UserContextType {
    UserId: number | undefined;
    UserNome: string | undefined;
    UserEmail: string | undefined;
    UserIsAdmin: boolean | undefined;
    UserAuth: any;
    UserIsDriver: boolean | undefined;
    mudaId: (id: number) => void;
    mudaNome: (nome: string) => void;
    mudaEmail: (email: string) => void;
    mudaIsAdmin: (isAdmin: boolean) => void;
    mudaAuth: (auth: any) => void;
    mudaIsDriver: (isDriver: boolean) => void;
}

// Create the UserContext with undefined as initial values
export const UserContext = createContext < UserContextType > ({
    UserId: undefined,
    UserNome: undefined,
    UserEmail: undefined,
    UserIsAdmin: undefined,
    UserAuth: undefined,
    UserIsDriver: undefined,
    mudaId: () => { },
    mudaNome: () => { },
    mudaEmail: () => { },
    mudaIsAdmin: () => { },
    mudaAuth: () => { },
    mudaIsDriver: () => { },
});

function UserProvider({ children }: { children: React.ReactNode }) {
    const [UserId, setUserId] = useState < number | undefined > ();
    const [UserNome, setUserNome] = useState < string | undefined > ();
    const [UserEmail, setUserEmail] = useState < string | undefined > ();
    const [UserIsAdmin, setUserIsAdmin] = useState < boolean | undefined > ();
    const [UserAuth, setUserAuth] = useState < any > ();
    const [UserIsDriver, setUserIsDriver] = useState < boolean | undefined > ();

    useEffect(() => {
        const getUserData = async () => {
            try {
                // Check if user data is stored in AsyncStorage
                const userData = await AsyncStorage.getItem("user_logado");
                if (userData) {
                    const user = JSON.parse(userData);
                    setUserId(user.id);
                    setUserNome(user.nome);
                    setUserEmail(user.email);
                    setUserIsAdmin(user.isAdmin);
                    setUserIsDriver(user.isDriver);
                    setUserAuth(user.auth);
                }
            } catch (error) {
                console.error("Failed to load user data:", error);
            }
        };

        getUserData();
    }, []);

    function mudaId(id: number) {
        setUserId(id);
    }

    function mudaNome(nome: string) {
        setUserNome(nome);
    }

    function mudaEmail(email: string) {
        setUserEmail(email);
    }

    function mudaIsAdmin(isAdmin: boolean) {
        setUserIsAdmin(isAdmin);
    }

    function mudaAuth(auth: any) {
        setUserAuth(auth);
    }

    function mudaIsDriver(isDriver: boolean) {
        setUserIsDriver(isDriver);
    }

    return (
        <UserContext.Provider
            value={{
                UserId,
                mudaId,
                UserNome,
                mudaNome,
                UserEmail,
                mudaEmail,
                UserIsAdmin,
                mudaIsAdmin,
                UserAuth,
                mudaAuth,
                UserIsDriver,
                mudaIsDriver,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
