import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
	return (
		<div className={styles.notFoundContainer}>
			<h1 className={styles.errorCode}>404</h1>
			<h3 className={styles.title}>Page not found</h3>
			<NavLink to="/login" className={styles.link}>
				Go to login page
			</NavLink>
		</div>
	)
}
