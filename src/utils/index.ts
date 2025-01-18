import { v4 as uuidv4 } from 'uuid';
export const randomNum = () => {
  return Math.floor(Math.random() * 1000000)
}

export const randomEvents = () => {
  return Math.floor(Math.random() * 100)
}

export const randomUuid = () => {
  const str = uuidv4()
  const uuid = str.replace(/-/g, '')
  return '0X'+ uuid.substring(0, 6) + '....' + uuid.substring(10, 14);
}

export const isUser = (tag: string) => {
  return ['Company', 'Chart type', 'Field','List', 'Method', 'unknown', 'User'].includes(tag)
}

export const isProject = (tag: string) => {
  return ['Organization', 'Person', 'Technology', 'Tool', 'Event','Concept'].includes(tag)
}