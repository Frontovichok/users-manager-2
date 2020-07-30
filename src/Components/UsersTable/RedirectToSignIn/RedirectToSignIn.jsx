import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './RedirectToSignIn.module.css'

function RedirectToSignIn() {
	return (
		<div className={styles.redirectContainer}>
			<h2 className={styles.title}>You are not authorized</h2>
			<NavLink to="/login" className={styles.link}>
				Go to login page
			</NavLink>
		</div>
	)
}

export default RedirectToSignIn
