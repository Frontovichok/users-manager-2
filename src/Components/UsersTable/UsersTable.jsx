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

let getFilteredUsers = (users, searchQuery) => {
	if (searchQuery === '') return users

	return users.filter((user) =>
		user.username.toLowerCase().includes(searchQuery.toLowerCase())
	)
}

let getSortedUsers = (users, sortDirection) => {
	if (sortDirection === '') return users

	let ascSort = users.sort((a, b) => a.id - b.id)
	let result = sortDirection === 'ASC' ? ascSort : [...ascSort].reverse()
	return result
}

function UsersTable(props) {
	const { users: initialUsers } = props
	let [activePage, setActivePage] = useState(1)
	let [searchQuery, setSearchQuery] = useState('')
	let [sortDirection, setSortDirection] = useState('')
	let users = initialUsers
	users = getFilteredUsers([...users], searchQuery)
	users = getSortedUsers([...users], sortDirection)

	let usersPerPage = 10
	let countPages = Math.ceil(users.length / usersPerPage)
	let slicedUsers = sliceUsersByPage(users, usersPerPage, countPages)

	let switchSortDirection = () => {
		switch (sortDirection) {
			case '':
				setSortDirection('ASC')
				break
			case 'ASC':
				setSortDirection('DESC')
				break
			case 'DESC':
				setSortDirection('')
				break
			default:
				break
		}
	}

	return (
		<div className={styles.tableContainer}>
			<h2>Our users</h2>
			<SearchForm
				searchUsers={(query) => {
					if (query !== '') setActivePage(1)
					setSearchQuery(query)
				}}
			/>
			{searchQuery && (
				<p className={styles.foundedUsers}>
					<b>{users.length}</b> users found
				</p>
			)}
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
							<IconButton
								color={sortDirection ? 'primary' : 'default'}
								onClick={switchSortDirection}
							>
								<SortIcon
									fontSize="small"
									className={
										sortDirection === 'DESC'
											? styles.sortIconDESC
											: styles.sortIcon
									}
								/>
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
				handleChange={setActivePage}
			/>
		</div>
	)
}

export default UsersTable
