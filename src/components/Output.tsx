import DataTable, { createTheme } from "react-data-table-component";

createTheme('solarized', {
    text: {
      primary: '#FFF',
      secondary: '#FFF',
    },
    background: {
      default: '#2c2c2c',
    },
    context: {
      background: '#9143ea',
      text: '#FFFFFF',
    },
    divider: {
      default: '#393939',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });


const customStyles = {
    headCells: {
		style: {
			fontWeight: 'bold',
            fontSize: 14,
		},
	},
    cells: {
		style: {
			color: '#a0a0a0'
		},
	},
}

function getColumns(data: any[] = []) {
    let columns: any[] = [];

    if(data.length > 0) {
        const firstObject = data[0];

        for(let key in firstObject) {
            columns.push({
                name: key,
                selector: (row: any) => row[key],
            });
        }
    }

    return columns;
}

function exportJSON(data: any) {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "flow-export-data.json";

    link.click();
}

export type OutputProps = {
    data: any[],
};

export default function Output({
    data,
}: OutputProps) {

    const columns = getColumns(data);

    return (
        <div className="output">
            <div className="output-header">
                <h3>Output</h3>
                <button onClick={() => exportJSON(data)}>Export JSON</button>
            </div>

            <DataTable
                dense
                columns={columns}
                data={data}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="250px"
                theme="solarized"
                customStyles={customStyles}
            />
        </div>
    );
}