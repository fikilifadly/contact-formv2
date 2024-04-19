import { showModalHandler } from "../utils";

const Table = ({ fields, data, loading, idModal, getDataByIdHandler }) => {
	const ctaHandler = (e) => {
		const { id, action } = e.currentTarget.dataset;

		if (id) {
			getDataByIdHandler(id);
			if (action === "edit") {
				showModalHandler();
			} else {
				showModalHandler(idModal);
			}
		}
	};

	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra">
				<thead>
					<tr>
						<th>No</th>
						{fields.map((field, index) => (
							<th key={index}>{field[0]}</th>
						))}
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{!loading &&
						data.length > 0 &&
						data.map((item, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								{fields.map((field, fieldIndex) => (
									<td key={fieldIndex}>{item[field[1]]}</td>
								))}
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

export default Table;
