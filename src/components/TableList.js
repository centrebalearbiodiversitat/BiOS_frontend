import React from 'react';
import {Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

export default function TableList({list, headers}) {
	return (
		<Table aria-label="Example table with client side sorting"
			       classNames={{
				       table: "min-h-[100px]",
			       }}>
				<TableHeader>
					{
						headers.map(
							({key, name}) => (
								<TableColumn key={key} allowsSorting>
									{name}
								</TableColumn>
							)
						)
					}
				</TableHeader>
				<TableBody items={list} isLoading={false} loadingContent={<Spinner label="Loading..."/>}>
					{(item) => (
						<TableRow key={item.id}>
							{
								(columnKey) => (
									<TableCell>{
										item[columnKey]}
									</TableCell>
								)
							}
						</TableRow>
					)}
				</TableBody>
			</Table>
	)
}