import React, { useState } from 'react'
import Highlighter from 'react-highlight-words'
import { IconButton } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Loader from '../Common/Loader/Loader'
import PaginationControlled from '../Common/Pagination/Pagination'
import SearchForm from './Search/Search'
import styles from './UsersTable.module.css'

function sliceUsersByPage(users, usersPerPage, countPages) {
	let slicedUsers = []

	for (let i = 0; i <= countPages; i++) {
		let leftEnd = i * usersPerPage
		let rightEnd = (i + 1) * usersPerPage
		slicedUsers.push(users.slice(leftEnd, rightEnd))
	}
	return slicedUsers
}

function UsersTable(props) {
	const { users: initialUsers } = props
	let [activePage, setPage] = useState(1)
	let [sortedUsers, setSortedUsers] = useState([])
	let [filteredUsers, setFilteredUsers] = useState([])
	let [searchQuery, setSearchQuery] = useState('')
	let users = filteredUsers.length > 0 ? filteredUsers : initialUsers
	let usersPerPage = 10
	let countPages = Math.ceil(users.length / usersPerPage)
	let slicedUsers = sliceUsersByPage(users, usersPerPage, countPages)

	let filterUsersByUsername = (query) => {
		setSearchQuery(query)
		if (query === '') {
			setFilteredUsers([])
		} else {
			setFilteredUsers(
				initialUsers.filter((user) =>
					user.username.toLowerCase().includes(query.toLowerCase())
				)
			)
		}
	}

	return (
		<div className={styles.tableContainer}>
			<h2>Our users</h2>
			<SearchForm
				searchUsers={(query) => {
					filterUsersByUsername(query)
				}}
			/>
			{searchQuery && `${filteredUsers.length} users found`}
			<table className={styles.usersTable}>
				<colgroup className={styles.colGroup}>
					<col style={{ width: '10%' }} />
					<col style={{ width: '27%' }} />
					<col style={{ width: '27%' }} />
					<col style={{ width: '27%' }} />
					<col style={{ width: '9%' }} />
				</colgroup>
				<thead>
					<tr>
						<th>
							id
							<IconButton>
								<SortIcon fontSize="small" className={styles.sortIcon} />
							</IconButton>
						</th>
						<th>Username</th>
						<th>First name</th>
						<th>Last name</th>
						<th>Modify</th>
					</tr>
				</thead>
				<tbody>
					{!props.usersIsLoading && users.length > 0 ? (
						slicedUsers[activePage - 1].map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>
									<Highlighter
										highlightClassName="kkk"
										searchWords={[searchQuery]}
										autoEscape={true}
										textToHighlight={user.username}
									/>
									&nbsp;
								</td>
								<td>{user.first_name}&nbsp;</td>
								<td>{user.last_name}&nbsp;</td>
								<td>
									<IconButton color="primary">
										<EditIcon color="disabled" fontSize="small" />
										<DeleteIcon color="disabled" fontSize="small" />
									</IconButton>
								</td>
							</tr>
						))
					) : (
						<tr className={styles.loading}>
							<td colSpan="100%">
								<Loader size={60} />
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<PaginationControlled
				size="large"
				page={activePage}
				count={countPages}
				handleChange={setPage}
			/>
		</div>
	)
}

export default UsersTable
