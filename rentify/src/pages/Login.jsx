import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn({ onSubmit }) { 
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSignUp, setIsSignUp] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();
	
	// Get users from localStorage or use defaults
	const getUsers = () => {
		const stored = localStorage.getItem('users');
		return stored ? JSON.parse(stored) : [
			{ id: 'user123', email: 'user@example.com', password: 'password123' }
		];
	};
	
	const saveUsers = (users) => {
		localStorage.setItem('users', JSON.stringify(users));
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		const users = getUsers();
		
		if (isSignUp) {
			// Sign up new user
			const existingUser = users.find(u => u.email === email);
			if (existingUser) {
				setError('Email already exists');
				return;
			}
			
			const newUser = {
				id: 'user' + Date.now(),
				email,
				password
			};
			
			users.push(newUser);
			saveUsers(users);
			
			localStorage.setItem('userId', newUser.id);
			localStorage.setItem('userEmail', newUser.email);
			navigate("/");

			console.log(users)
		} else {
			// Log in for existing user
			const user = users.find(
				u => u.email === email && u.password === password
			);
			
			if (user) {
				localStorage.setItem('userId', user.id);
				localStorage.setItem('userEmail', user.email);
				navigate("/dashboard");
				
				if (onSubmit) {
					onSubmit({ email, password });
				}
			} else {
				setError('Invalid email or password');
			}
		}
	};
	
	return (
		<div className="login-wrapper">
			<div className="login-box">
				<h2>{isSignUp ? 'Create Account' : 'User Login'}</h2>
				<form onSubmit={handleSubmit}>
					{error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
					
					<label>
						Email:
						<input
							className="input"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<label>
						Password:
						<input
							className="input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<button className="hero-btn" type="submit">
						{isSignUp ? 'Sign Up' : 'Log In'}
					</button>
				</form>
				
				<p style={{ marginTop: '15px', textAlign: 'center' }}>
					{isSignUp ? 'Already have an account?' : "Don't have an account?"}
					<button 
						onClick={() => {
							setIsSignUp(!isSignUp);
							setError('');
						}}
						style={{ 
							background: 'none', 
							border: 'none', 
							color: '#007bff', 
							cursor: 'pointer',
							textDecoration: 'underline',
							marginLeft: '5px'
						}}
					>
						{isSignUp ? 'Log In' : 'Sign Up'}
					</button>
				</p>
			</div>
		</div>
	);
}

export default LogIn;