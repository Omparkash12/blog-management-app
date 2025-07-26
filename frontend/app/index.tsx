"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";

interface IndexPageProps {
    children: React.ReactNode;
}

const IndexPage: React.FC<IndexPageProps> = ({ children }) => {
    return (
        <main className="IndexPage-os">
            <Provider store={store}>{children}</Provider>
        </main>
    );
};

export default IndexPage;
