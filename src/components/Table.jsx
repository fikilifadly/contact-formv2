import React from "react";
import { convertString, showModalHandler } from "../utils";

const TableFC = ({ fields, data, loading, idModal, getDataByIdHandler }) => {
	const ctaHandler = (e) => {
		const { id, action } = e.currentTarget.dataset;

		getDataByIdHandler(id);
		if (action === "edit") {
			showModalHandler();
		} else {
			showModalHandler(idModal);
		}
	};

	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				<thead>
					<tr>
						<th>No</th>
						{fields.map((field, index) => (
							<th key={index}>{convertString(field[0])}</th>
						))}
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{loading && (
						<tr>
							<td colSpan={fields.length + 2}>
								<div className="h-full flex items-center justify-center">
									<span className="loading loading-spinner  h-[300px] w-[300px]"></span>
								</div>
							</td>
						</tr>
					)}
					{!loading &&
						data.length > 0 &&
						data.map((item, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								{fields.map((field, fieldIndex) => {
									if (field[0] === "photo") {
										return (
											<td key={fieldIndex}>
												<img src={item[field[0]]} alt={item[field[0]]} className="w-10 h-10 rounded-full" />
											</td>
										);
									}
									return <td key={fieldIndex}>{item[field[0]]}</td>;
								})}
								<td>
									<div className="flex gap-3">
										<button className="bg-yellow-400 px-5 py-2 rounded-md text-xs" data-id={item.id} data-action="edit" onClick={ctaHandler}>
											Edit
										</button>
										<button className="bg-red-600 px-5 py-2 rounded-md text-xs text-white" data-id={item.id} data-action="delete" onClick={ctaHandler}>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

const Table = React.memo(TableFC);

export default Table;
