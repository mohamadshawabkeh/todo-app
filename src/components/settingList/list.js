import React from 'react';
import { Card, Grid, Col, Text } from '@mantine/core';
import { useSettings } from '../../context/settings/index';
import "./list.scss";

function List({ searchKeyword }) {
  const { settings } = useSettings();

  return (
    <Card shadow="xs" padding="md">
      <h2>Current Settings</h2>
      <Grid gutter="sm">
        <Col span={12}>
          <Text size="lg">Display Count: {settings.displayCount}</Text>
        </Col>
        <Col span={12}>
          <Text size="lg">
            Hide Completed: <span>{settings.hideCompleted ? 'Yes' : 'No'}</span>
          </Text>
        </Col>
        <Col span={12}>
          <Text size="lg">
            Search by Keyword: <span>{searchKeyword}</span>
          </Text>
        </Col>
      </Grid>
    </Card>
  );
}

export default List;
