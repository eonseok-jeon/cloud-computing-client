import styled from '@emotion/styled';
import instance from '../apis/instance';
import { useState } from 'react';
import { useRef } from 'react';

export default function Search({ onSearch }) {
  const timerRef = useRef(null);
  const [suggests, setSuggests] = useState([]);

  const handleChange = async (e) => {
    e.preventDefault();
    const tag = e.target.value.replace(/\s/g, '').split(',');
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer
    timerRef.current = setTimeout(async () => {
      const res = await instance.get(
        `/search/auto-complete?input=${tag[tag.length - 1]}`
      );

      setSuggests(res.data.suggestKeywords);
    }, 150);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value === '') {
      onSearch({ data: [], isSearch: false });
      return;
    }

    const tags = e.target[0].value.replace(/\s/g, '').split(',');
    const queryString = tags.map((tag) => `keywords=${tag}`).join('&');

    const res = await instance.get(`/search/tag?${queryString}`, {
      params: {
        size: 1000,
      },
    });

    onSearch({ data: res.data.imageIds, isSearch: true });
  };

  return (
    <>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='태그를 검색해보세요. 반드시 태그를 ,를 이용하여 구분해주세요. (ex. 만화, 몸짓, 미술). 입력이 완료되면 엔터키를 눌러주세요.'
        />
      </form>
      {suggests.length !== 0 && (
        <Suggests>
          <span>추천 태그 : </span>
          {suggests.map((item, idx) => (
            <Suggest key={`${idx}-${item}`}>{item}</Suggest>
          ))}
        </Suggests>
      )}
    </>
  );
}

const Input = styled.input`
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 80%;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 10px;

  &::placeholder {
    color: gray;
  }
`;

const Suggests = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Suggest = styled.span`
  border: 1px solid black;
  border-radius: 15px;
  padding: 3px 5px;
  text-align: center;
`;
