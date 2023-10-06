import * as React from 'react';
import LookingForCheckbox from '../../components/inputs/Checkbox/Checkbox';

const LookingFor = () => {
    const [checkedOne, setCheckedOne] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(false);

    const handleChangeOne = () => {
        setCheckedOne(!checkedOne);
    };

    const handleChangeTwo = () => {
        setCheckedTwo(!checkedTwo);
    };

    return (
        <div>
            <LookingForCheckbox
                label="Value 1"
                value={checkedOne}
                onChange={handleChangeOne}
            />
            <LookingForCheckbox
                label="Value 2"
                value={checkedTwo}
                onChange={handleChangeTwo}
            />
        </div>
    );
};

export default LookingFor;
