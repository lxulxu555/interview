import ReactDOM, { render } from "react-dom";
import { TableColumns } from "../../interface/table.interface";

interface IProps<T> {
    columns: Array<TableColumns>,
    dataSource: Array<T>,
    header: any
}

export default function Table<T>({ columns, dataSource, header }: IProps<T>) {
    const renderTbody = () => {
        return dataSource.map((item: any) => {
            return <tr key={item.key}>
                {
                    columns.map(column => {
                        if (column.render) {
                            return <td key={`${item.key} - ${column.dataIndex}`}>{column.render(item)}</td>
                        } else {
                            return <td key={`${item.key} - ${column.dataIndex}`}>{item?.[column.dataIndex ?? ""]}</td>
                        }
                    })
                }
            </tr>

        })

    }
    return <div>
        <table border={1}>
            <thead>
                <tr>
                    <td>
                        {header}
                    </td>
                </tr>
                <tr>
                    {
                        columns.map((column, index) => {
                            return <th key={column.dataIndex}>{column.title}</th>
                        })
                    }
                </tr>
            </thead>

            <tbody>
                {
                    renderTbody()
                }
            </tbody>
        </table>
    </div>

}