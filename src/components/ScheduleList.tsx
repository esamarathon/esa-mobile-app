import React, {useMemo} from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {GroupedVirtuoso} from 'react-virtuoso';
import ScheduleCard from './ScheduleCard';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 20px 0 0;
  padding: 0 20px 0;
  overflow-x: scroll;
`;

const DayTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  padding-top: 60px;
  padding-bottom: 30px;
  background: #e4e4e4;
  margin: 0;
`;

interface IProps {
  items: any;
}

interface GroupDataReturn {
  groups: any[];
  groupsData: any[];
}

interface GeneratedGroupData extends GroupDataReturn {
  groupsCount: any[];
}

interface GroupWithTitle {
  title: string;
}

function groupData(data: any[]): GroupDataReturn {
  const result: GroupDataReturn = {
    groups: [],
    groupsData: [],
  };

  if (!data) {
    return result;
  }

  data.map((item: GroupWithTitle | any) => {
    if (item.title) {
      result.groups = [...result.groups, item];
    } else {
      result.groupsData = [...result.groupsData, item];
    }
  });

  return result;
}

function calculateGroups(result: any): string[] {
  const counts: any[] = [];
  const groupValues = result.groups.map((value: any) => {
    return value.title;
  });

  const groupDatas = result.groupsData.map((value: any) => {
    return value.scheduled.split('T')[0];
  });

  groupValues.map((value: string) => {
    const megaVal = groupDatas.filter((value2: string) => {
      return value === value2;
    });

    counts.push(megaVal.length);
  });

  return counts;
}

function generateGroups(data: any) {
  const result: GeneratedGroupData = {
    groups: [],
    groupsData: [],
    groupsCount: [],
  };

  const generatedData = groupData(data);
  result.groups = generatedData.groups;
  result.groupsData = generatedData.groupsData;
  result.groupsCount = calculateGroups(result);

  return result;
}

function ScheduleList({items}: IProps) {
  const groups = useMemo(() => generateGroups(items), [items]);

  return (
    <List>
      <GroupedVirtuoso
        groupCounts={groups.groupsCount}
        groupContent={(index: number) => {
          return (
            <DayTitle id={groups.groups[index].title}>
              {dayjs(groups.groups[index].title).format('dddd D/M')}
            </DayTitle>
          );
        }}
        itemContent={(index: number) => {
          return <ScheduleCard run={groups.groupsData[index]} />;
        }}
      />
    </List>
  );
}

export default ScheduleList;
