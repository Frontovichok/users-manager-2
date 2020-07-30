import React from 'react'
import { CircularProgress } from '@material-ui/core'
import styles from './Loader.module.css'

function Loader({ size = 40 }) {
	return (
		<div className={styles.loaderContainer}>
			<CircularProgress size={size} className={styles.loader} />
			<p>Loading</p>
		</div>
	)
}

export default Loader
