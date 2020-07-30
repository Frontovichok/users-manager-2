import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	TextField,
	Button,
	InputAdornment,
	IconButton,
	CircularProgress,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import styles from './SignInForm.module.css'

function SignInForm({ signIn, isLoading }) {
	const [showPassword, setPasswordVisibility] = useState(false)
	const togglePasswordVisibility = () => setPasswordVisibility(!showPassword)
	const { handleSubmit, register, errors } = useForm()
	const onSubmit = ({ username, password }) => {
		signIn(username, password)
	}
	return (
		<div className={styles.signInformContainer}>
			<h2 className={styles.formTitle}>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formField}>
					<TextField
						name="username"
						label="username"
						variant="outlined"
						defaultValue="test_super"
						fullWidth
						inputRef={register({
							required: 'this field is required!',
							validate: (value) => value !== 'admin' || 'Nice try!',
						})}
						{...(errors.username && {
							error: true,
							helperText: errors.username.message,
						})}
					/>
				</div>
				<div className={styles.formField}>
					<TextField
						name="password"
						label="password"
						variant="outlined"
						defaultValue="Nf<U4f<rDbtDxAPn"
						fullWidth
						type={showPassword ? 'text' : 'password'}
						inputRef={register({
							required: 'this field is required!',
							validate: (value) => value !== 'admin' || 'Nice try!',
						})}
						{...(errors.password && {
							error: true,
							helperText: errors.password.message,
						})}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={togglePasswordVisibility}
										size="small"
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
							gg: <CircularProgress />,
						}}
					/>
				</div>

				<Button
					variant="contained"
					color="primary"
					type="submit"
					disabled={isLoading}
				>
					Sign In
				</Button>
			</form>
		</div>
	)
}

export default SignInForm
