import React from 'react'
import styled from 'styled-components'
// import ActivityList from './ActivityList'
import DidYouKnow from './DidYouKnow'
import PriceChart from './PriceChart'
import BalancesChartContainer from './BalancesChart'
import ReactHighcharts from 'react-highcharts'

ReactHighcharts.Highcharts.setOptions({ lang: { thousandsSep: ',' } })

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  @media(min-width: 992px) { flex-direction: row; }
`
const Column = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  box-sizing: border-box;
`
const ColumnLeft = styled(Column)`
  padding: 30px;
  @media(min-width: 992px) { padding: 30px 0px 30px 30px; }
`
const ColumnRight = styled(Column)`
  padding: 30px;
  @media(min-width: 992px) { padding: 30px 30px 30px 15px; }
`

const Home = () => (
  <Wrapper>
    <ColumnLeft>
      <BalancesChartContainer />
      {/* <ActivityList /> */}
    </ColumnLeft>
    <ColumnRight>
      <PriceChart />
      <DidYouKnow />
    </ColumnRight>
  </Wrapper>
)

export default Home
