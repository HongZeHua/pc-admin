import request from '@/utils/request'

/**
 * 项目功能
 */
export const getFeature = () => {
  return request({
    url: '/user/feature'
  })
}

/**
 * 章节
 */
export const getChapter = () => {
  return request({
    url: '/user/chapter'
  })
}
