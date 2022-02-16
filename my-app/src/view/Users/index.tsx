import { FC, useEffect, useState } from "react";
import Grid from '@mui/material/Grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import http from "../../http_comon"
import { User, UserRequest } from "./types";

const Users: FC = () => {

	const [users, setUsers] = useState<Array<User>>();
	const [totalPages, setTotalPages] = useState<number>(1);

	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		getData(page);
	}, []);

	const getData = (page: number) => {
		http.get<UserRequest>("/api/users/", { params: { page: page - 1 } })
			.then(response => {
				return response.data;
			})
			.then(data => {
				setUsers(data.content);
				setTotalPages(data.totalPages);
			})
			.catch(err => {
				console.log(err)
			})
	}

	const onClickPage = (e: any) =>  {
		let page = e.target.textContent;

		getData(Number(page));
		setPage(Number(page));
	}

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<TableContainer
						component={Paper}
						sx={{ m: 3 }}
					>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell>Display Name</TableCell>
									<TableCell>Down Votes</TableCell>
									<TableCell>Location</TableCell>
									<TableCell>Reputation</TableCell>
									<TableCell>UpVotes</TableCell>
									<TableCell>Views</TableCell>
									<TableCell>WebsiteUrl</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users && users.map((row) => (
									<TableRow key={row.id}>
										<TableCell>{row.id}</TableCell>
										<TableCell>{row.displayName}</TableCell>
										<TableCell>{row.downVotes}</TableCell>
										<TableCell>{row.location}</TableCell>
										<TableCell>{row.reputation}</TableCell>
										<TableCell>{row.upVotes}</TableCell>
										<TableCell>{row.views}</TableCell>
										<TableCell>{row.websiteUrl}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Stack
						spacing={2}
						sx={{ m: 3 }}>
						<Pagination
							count={totalPages}
							page={page}
							boundaryCount={1}
							variant="outlined"
							shape="rounded"
							onClick={ (e) => onClickPage(e) }
						/>
					</Stack>

				</Grid>
			</Grid>
		</>
	);
}

export default Users;