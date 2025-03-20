import styled from 'styled-components';

const Filter= ({filterStr, onChangeFnc}) => {
    return(
              <Wrapper>
                Find contact <input value={filterStr} onChange={onChangeFnc}/>
              </Wrapper>
    )
}

const Wrapper = styled.div`
  input{
    border: none;
    border-radius: 6px;
    padding: 4px;
  }
`
export default Filter