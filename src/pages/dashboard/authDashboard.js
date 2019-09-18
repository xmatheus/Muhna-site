import React from "react";

import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "../services/auth";

/* resumo = usado para autenticar a rota e nao deixar o acesso sem token
 *
 * depois do login o token eh salve e apartir dai essa rota pode ser acessada pela URL
 * caso nao, o cliente volta para a pag de login
 */

const AuthDashBoard = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{ pathname: "/", state: { from: props.location } }}
				/>
			)
		}
	/>
);

export default AuthDashBoard;
