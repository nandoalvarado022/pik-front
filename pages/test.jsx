import { storage } from "../lib/storage"

const file = storage.ref("/images/publications/15_6_2021_18_22_17_58_1080x1080.jpg");

const Test = () => {
  return <div>
    {JSON.stringify(file)}
  </div>
}

export default Test