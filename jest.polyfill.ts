import { TextEncoder, TextDecoder } from 'node:util';
import { TransformStream, ReadableStream, WritableStream } from 'node:stream/web';
import { BroadcastChannel } from 'node:worker_threads';

// Encoders
if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
}
if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
}

// Streams
if (!globalThis.TransformStream) {
  globalThis.TransformStream = TransformStream as unknown as typeof globalThis.TransformStream;
}
if (!globalThis.ReadableStream) {
  globalThis.ReadableStream = ReadableStream as unknown as typeof globalThis.ReadableStream;
}
if (!globalThis.WritableStream) {
  globalThis.WritableStream = WritableStream as unknown as typeof globalThis.WritableStream;
}

// BroadcastChannel (from Node built-in)
if (!globalThis.BroadcastChannel) {
  globalThis.BroadcastChannel = BroadcastChannel as unknown as typeof globalThis.BroadcastChannel;
}
