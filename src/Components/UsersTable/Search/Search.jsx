import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, IconButton, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import styles from './Search.module.css'

export default function Search({ searchUsers }) {
	const { handleSubmit, register } = useForm()
	const onSubmit = ({ search_query }) => {
		searchUsers(search_query.trim())
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.searchFieldContainer}>
				<TextField
					name="search_query"
					label="Find user"
					placeholder="username"
					multiline
					className={styles.searchField}
					inputRef={register}
					onKeyPress={(e) => {
						if (e.charCode === 13) {
							e.preventDefault()
							handleSubmit(onSubmit)()
						}
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton color="primary" type="submit">
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</div>
		</form>
	)
}
