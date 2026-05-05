import domains from './data/domains.json'
import subdomains from './data/subdomains.json'
import ksas from './data/ksas.json'
import learnContent from './data/learnContent.json'
import questions from './data/questions.json'

export { domains, subdomains, ksas, learnContent, questions }

export function getDomain(domainId) {
  return domains.find((d) => d.id === domainId)
}

export function getSubdomainsByDomain(domainId) {
  return subdomains.filter((s) => s.domainId === domainId)
}

export function getKSAsBySubdomain(subdomainId) {
  return ksas.filter((k) => k.subdomainId === subdomainId)
}

export function getKSA(ksaId) {
  return ksas.find((k) => k.id === ksaId)
}

export function getLearnContent(ksaId) {
  return learnContent.find((item) => item.ksaId === ksaId)
}

export function getQuestionsByFilters(filters = {}) {
  return questions.filter((q) => {
    if (filters.domainId && q.domainId !== filters.domainId) return false
    if (filters.subdomainId && q.subdomainId !== filters.subdomainId) return false
    if (filters.ksaId && q.ksaId !== filters.ksaId) return false
    if (filters.cognitiveLevel && q.cognitiveLevel !== filters.cognitiveLevel) return false
    if (filters.qualifier && q.qualifier !== filters.qualifier) return false
    return true
  })
}
