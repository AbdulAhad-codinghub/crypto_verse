import React ,{useState,useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card,Row,Col,Input } from 'antd' 

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({myBool}) => {
    console.log(myBool);
    let count=myBool?10:100;

    const { data : cryptoslist,isFetching}=useGetCryptosQuery(count);
    const [cryptos , setCryptos]= useState([]);
    const [searchTerm, setsearchTerm] = useState('');
    // console.log(cryptos);
    useEffect(() => {
        const filteredData = cryptoslist?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData);
    }, [cryptoslist,searchTerm])
    
    if(isFetching) return 'Loading ...';

  return (
<>
{!myBool && (
    <div className="search-crypto">
        <Input placeholder='Search Cryptocurrency' onChange={(e)=>setsearchTerm(e.target.value)}/>
    </div>
)}
    <Row gutter={[32,32]} className="crypto-card-container">
        {cryptos?.map((currency)=>(
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                <Link to={`/crypto/${currency.uuid}`}>
                    <Card 
                        title={`${currency.rank}. ${currency.name}`}
                        extra={<img className='crypto-image' src={currency.iconUrl}/>}
                        howerable    
                    >
                    <p>Price: {millify(currency.price)}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>Daily Change: {millify(currency.change)}</p>
                    </Card>
                </Link>
            </Col>
        ))}

    </Row>
</>
    )
}

export default Cryptocurrencies