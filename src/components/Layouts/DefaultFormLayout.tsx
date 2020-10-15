import React from 'react';
import {Box, Container, Paper, Typography} from "@material-ui/core";

export interface DefaultFormLayoutProps {
  title: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export const DefaultFormLayout: React.FC<DefaultFormLayoutProps> = ({ title, maxWidth, children}) => {

  return (
    <Box overflow="auto" paddingTop="30px">
      <Container maxWidth={maxWidth}>
        <Paper elevation={2}>
          <Box padding="16px">
            <Box margin="30px 0 20px">
              <Typography
                variant="h5"
                component="h1"
              >
                {title}
              </Typography>
            </Box>
            {children}
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}