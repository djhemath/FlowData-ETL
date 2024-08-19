import DataTable, { createTheme } from "react-data-table-component";

// TODO: Prepare column based on rows and make the table dynamic
const columns = [
	{
		name: 'Title',
		selector: (row: any) => row.title,
	},
	{
		name: 'Year',
		selector: (row: any) => row.year,
	},
    {
		name: 'Is alive',
		selector: (row: any) => row.isAlive,
	},
];

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

const data = [
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
        isAlive: true,
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
        isAlive: true,
	},
    {
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
        isAlive: true,
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
        isAlive: true,
	},
    {
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
        isAlive: true,
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
        isAlive: true,
	},
    {
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
        isAlive: true,
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
        isAlive: true,
	},
    {
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
        isAlive: true,
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
        isAlive: true,
	},
    {
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
        isAlive: true,
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
        isAlive: true,
	},
    {
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
        isAlive: true,
	},
	{
		id: 2,
		title: 'ABCD',
		year: '1984',
        isAlive: true,
	},
]

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

export default function Output() {
    return (
        <div className="output">
            <div className="output-header">
                <h3>Output</h3>
                <button>Export JSON</button>
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