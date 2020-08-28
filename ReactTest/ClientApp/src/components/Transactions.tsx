import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as TransactionsStore from '../store/Transactions';
//import { DropdownButton, Dropdown } from 'react-bootstrap';

// At runtime, Redux will merge together...
type TransactionProps =
    TransactionsStore.TransactionsState // ... state we've requested from the Redux store
    & typeof TransactionsStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startPageIndex: string, transactionTypeFilter: string, transactionStatusFilter:string }>; // ... plus incoming routing parameters


class Transactions extends React.PureComponent<TransactionProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Transactions</h1>
                {this.renderStatuses()}
                {this.renderTypes()}
                {this.renderForecastsTable()}
                {this.renderPagination()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        const startPageIndex = parseInt(this.props.match.params.startPageIndex, 10) || 0;
        //const transactionTypeFilter = this.props.match.params.transactionTypeFilter;
        //const transactionStatusFilter = this.props.match.params.transactionStatusFilter;
        this.props.requestTransactions(startPageIndex);
        this.props.requestStatuses();
        this.props.requestTypes();
    }

    private renderStatuses() {

        return (
            <select name="transactionStatusFilter">
                {this.props.transactionStatusFilters.map((status: string) =>
                    <option value={`${status}`}>{status}</option>
                )}
            </select>
            /*
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                {this.props.transactionStatusFilters.map((status: string) =>
                    <Dropdown.Item as="button">{status}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>*/
        );
    }

    private renderTypes() {

        return (
            <select name="transactionTypesFilter">
                {this.props.transactionTypeFilters.map((type: string) =>
                    <option value={`${type}`}>{type}</option>
                )}
            </select>
            /*
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                {this.props.transactionStatusFilters.map((status: string) =>
                    <Dropdown.Item as="button">{status}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>*/
        );
    }

    private renderForecastsTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>TransactionId</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Client</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.transactions.map((transaction: TransactionsStore.Transaction) =>
                        <tr key={transaction.transactionId}>
                            <td>{transaction.transactionId}</td>
                            <td>{transaction.transactionStatus}</td>
                            <td>{transaction.transactionType}</td>
                            <td>{transaction.clientName}</td>
                            <td>{transaction.amount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    private renderPagination() {
        const prevStartPageIndex = (this.props.startPageIndex || 0) - 5;
        const nextStartPageIndex = (this.props.startPageIndex || 0) + 5;

        return (
            <div className="d-flex justify-content-between">
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartPageIndex}`}>Previous</Link>
                {this.props.isLoading && <span>Loading...</span>}
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartPageIndex}`}>Next</Link>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.transactions, // Selects which state properties are merged into the component's props
    TransactionsStore.actionCreators // Selects which action creators are merged into the component's props
)(Transactions as any);
