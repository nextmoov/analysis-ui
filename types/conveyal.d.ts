// eslint-disable-next-line
declare namespace CL {
  /**
   * Common geospatial coordinate types
   */
  export type LonLat = {
    lon: number
    lat: number
  }
  export type Point = {
    x: number
    y: number
  }
  export type CoordinateArray = [longitude: number, latitude: number]

  /**
   * Commonly used bounds object
   */
  export type Bounds = {
    north: number
    south: number
    east: number
    west: number
  }

  /**
   * Segment speeds. Stored in timetables for ATP and directly on the modification for Reroute.
   */
  export type SegmentSpeeds = number[]

  /**
   * A stored segment for a modification.
   */
  export type ModificationSegment = {
    fromStopId: void | string
    geometry: GeoJSON.Point | GeoJSON.LineString
    spacing: number
    stopAtEnd: boolean
    stopAtStart: boolean
    toStopId: void | string
  }

  /**
   * Generated from segments, not stored.
   */
  export type StopFromSegment = CL.LonLat & {
    stopId: void | string
    index: number
    autoCreated: boolean
    distanceFromStart: number
  }

  /**
   * A MongoDB ObjectID. May be turned into a legitimate `ObjectId` later
   */
  export type ObjectID = string

  /**
   * Base DB Model with common properties.
   */
  export interface IModel {
    _id: ObjectID
    accessGroup: string
    nonce: ObjectID
    name: string
    createdAt: string
    updatedAt: string
  }

  /**
   * Region model
   */
  export interface Region extends IModel {
    bounds: Bounds
  }

  /**
   * Analysis request presets
   */
  export interface Preset extends IModel {
    profileRequest: Record<string, unknown>
    regionId: string
  }

  export type Timetable = {
    segmentSpeeds: SegmentSpeeds
  }

  /**
   *
   */
  export type ModificationTypes =
    | 'add-streets'
    | 'add-trip-pattern'
    | 'modify-streets'
    | 'reroute'

  /**
   * Base modification
   */
  export interface IModification extends IModel {
    type: ModificationTypes
  }

  /**
   *
   */
  export interface AddStreets extends IModification {
    type: 'add-streets'
    lineStrings: GeoJSON.Position[][]
  }

  /**
   *
   */
  export interface ModifyStreets extends IModification {
    type: 'modify-streets'
    polygons: GeoJSON.Position[][]
  }

  /**
   *
   */
  export interface AddTripPattern extends IModification {
    type: 'add-trip-pattern'
    segments: ModificationSegment[]
    timetables: Timetable[]
  }

  /**
   *
   */
  export interface Reroute extends IModification {
    type: 'reroute'
    segments: ModificationSegment[]
    segmentSpeeds: SegmentSpeeds
  }
}
