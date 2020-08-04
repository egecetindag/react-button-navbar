import * as React from 'react';
import './select.scss';
declare const SelectComp: React.FC<{
    currentPage: string;
    children: JSX.Element[];
    onSelect: (str: string) => void;
}>;
export declare const Option: React.FC<{
    value: string;
}>;
export default SelectComp;
