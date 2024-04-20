import React from "react";
import { convertString, showModalHandler } from "../utils";

const TableFC = ({ fields: headerFields, data: rows, isLoading, modalId, onGetRowById, onEditRow, onDeleteRow }) => {
	const renderHeaderCells = () => headerFields.map((field, index) => <th key={index}>{convertString(field)}</th>);

	const renderRowCells = (row) =>
		headerFields.map((field, index) => {
			if (field === "photo") {
				return (
					<td key={index}>
						<img src={row[field]} alt={row[field]} className="w-10 h-10 rounded-full" />
					</td>
				);
			}

			return <td key={index}>{row[field]}</td>;
		});

	const renderActionButtons = (row) => (
		<td>
			<div className="flex gap-3">
				<button className="bg-yellow-400 px-2 py-1 rounded-md text-xs" data-id={row.id} data-action="edit" onClick={onEditRow}>
					Edit
				</button>
				<button className="bg-red-600 px-2 py-1 rounded-md text-xs text-white" data-id={row.id} data-action="delete" onClick={onDeleteRow}>
					Delete
				</button>
			</div>
		</td>
	);

	const renderRows = () =>
		rows.map((row, index) => (
			<tr key={index}>
				<td>{index + 1}</td>
				{renderRowCells(row)}
				{renderActionButtons(row)}
			</tr>
		));

	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				<thead>
					<tr>
						<th>No</th>
						{renderHeaderCells()}
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{isLoading && (
						<tr>
							<td colSpan={headerFields.length + 2}>
								<div className="h-full flex items-center justify-center">
									<span className="loading loading-spinner  h-[300px] w-[300px]" />
								</div>
							</td>
						</tr>
					)}
					{!isLoading && rows.length > 0 && renderRows()}
				</tbody>
			</table>
		</div>
	);
};

const Table = React.memo(TableFC);

export default Table;
