import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';


class ExportButton extends React.PureComponent {
    public render() {
        return (
            <React.Fragment>
                <button type="button"
                  /*  onClick={() =>
                        agents.Localities.file(
                            getMatchedIndexes()
                        ).then((response) => {
                            var fileDownload = require("js-file-download");
                            fileDownload(response, "filename.csv");
                        })
                    }*/>
                    Export
                </button>  
            </React.Fragment>);
    }
};
              
