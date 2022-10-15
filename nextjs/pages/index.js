import Layout from "../components/Layout"

import {
  useAccount,
  useWaitForTransaction,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi"

import artifacts from "../artifacts/Counter.json"
import CounterAddress from "../artifacts/contract-address.json"

const { abi } = artifacts
const { Counter } = CounterAddress


const Home = () => {

  const { isConnected } = useAccount()

  const {
    data: count,
    isError: countError,
    isSuccess: countSuccess
  } = useContractRead({
    addressOrName: Counter,
    contractInterface: abi,
    functionName: "count",
    watch: true,
  })

  const { config: decConfig, isError: prepareDecError, isSuccess: prepareDecSuccess } = usePrepareContractWrite({
    addressOrName: Counter,
    contractInterface: abi,
    functionName: "dec",
  })

  const { config: incConfig, isError: prepareIncError, isSuccess: prepareIncSuccess } = usePrepareContractWrite({
    addressOrName: Counter,
    contractInterface: abi,
    functionName: "inc",
  })


  const {
    data: incData,
    write: inc,
    isLoading: isIncLoading,
    isSuccess: isIncStarted,
  } = useContractWrite(incConfig)

  const {
    data: decData,
    write: dec,
    isLoading: isDecLoading,
    isSuccess: isDecStarted,
  } = useContractWrite(decConfig)

  return (
    <Layout>
      <div className="flex flex-col items-center space-y-4">
        <h1 className="mt-8 text-5xl">hello web3</h1>
        <h2 className="text-lg">{Counter}</h2>
        <h3 className="text-4xl">{Number(count) || 0}</h3>
        <button className="border py-2 px-4 rounded-lg text-xl" onClick={() => inc?.()}>inc</button>
        <button className="border py-2 px-4 rounded-lg text-xl" onClick={() => dec?.()}>dec</button>
        {"prepare tx inc: " + JSON.stringify(prepareIncSuccess)}
        <br />
        {"prepare tx dec: " + JSON.stringify(prepareDecSuccess)}
        <br />
        {"inc success: " + JSON.stringify(isIncStarted)}
        <br />
        {"dec success: " + JSON.stringify(isDecStarted)}
      </div>
    </Layout>
  )
}

export default Home
