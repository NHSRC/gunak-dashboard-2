import _ from 'lodash';

import React, {useEffect, useState} from 'react';
import StickyHeadTable from 'src/views/facilityView/Table';
import BasicTable from 'src/views/facilityView/SingleTable';
import DataReadService from '../../service/DataReadService';

const FacilityView = () => {
  const [facility, setFacility] = useState([]);
  useEffect(() => {
    DataReadService.getFacilityView().then((apiResponse) => {
      setFacility(apiResponse.data);
    })
  }, []);
  if (!_.isEmpty(facility)) {
    return (
      <div>
        <div><BasicTable facility={facility}> </BasicTable></div>
        <StickyHeadTable rows={facility.assessments} />
      </div>
    );
  }
  return null;
};
export default FacilityView;
